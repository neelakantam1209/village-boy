
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection } from 'firebase/firestore';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCollection, useFirestore, useMemoFirebase, useStorage } from '@/firebase';
import { addService } from '@/services/serviceService';
import { useToast } from '@/hooks/use-toast';
import { getLocalImageByName } from '@/lib/image-utils';
import type { Category } from '@/lib/types';

const serviceSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  slug: z.string().min(1, 'Slug is required.'),
  category: z.string().min(1, 'Category is required.'),
  shortDescription: z.string().min(1, 'Short description is required.'),
  imageFile: z.instanceof(File).optional(),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddServiceModal({ isOpen, onClose }: AddServiceModalProps) {
  const firestore = useFirestore();
  const storage = useStorage();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const categoriesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'categories');
  }, [firestore]);
  const { data: categories, isLoading: areCategoriesLoading } = useCollection<Category>(categoriesQuery);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = async (data: ServiceFormValues) => {
    if (!firestore || !storage) return;

    setIsUploading(true);
    let imageUrl = '';
    
    if (data.imageFile) {
      try {
        const storageRef = ref(storage, `services/${Date.now()}_${data.imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, data.imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast({ title: "Image Upload Failed", description: "Could not upload service image.", variant: "destructive" });
        setIsUploading(false);
        return;
      }
    } else {
        imageUrl = getLocalImageByName(data.name);
    }

    const { imageFile, ...serviceData } = data;
    
    const finalServiceData = {
        ...serviceData,
        image: imageUrl,
        price: 0,
        rating: 0,
        reviewsCount: 0,
        description: '',
        included: [],
        pricingTiers: [],
        reviews: [],
        faqs: [],
        location: ''
    };

    try {
        addService(firestore, finalServiceData as any);
        toast({ title: "Service Added", description: `${data.name} has been added.` });
        form.reset();
        onClose();
    } catch (error) {
        console.error("Error adding service:", error);
        toast({ title: "Error", description: "Failed to add service.", variant: "destructive" });
    } finally {
        setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Service Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="slug" render={({ field }) => (
              <FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {areCategoriesLoading && <SelectItem value="loading" disabled>Loading...</SelectItem>}
                    {categories && categories.map(cat => <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="shortDescription" render={({ field }) => (
              <FormItem><FormLabel>Short Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="imageFile" render={({ field }) => (
              <FormItem>
                <FormLabel>Service Image</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={isUploading}>{isUploading ? "Adding..." : "Add Service"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
