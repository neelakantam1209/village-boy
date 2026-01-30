
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useCollection, useFirestore, useMemoFirebase, useStorage } from '@/firebase';
import { addWorker } from '@/services/workerService';
import { useToast } from '@/hooks/use-toast';
import { getLocalImageByName } from '@/lib/image-utils';
import type { Category, Service } from '@/lib/types';

const workerSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  specialization: z.string().min(1, 'Service type is required.'),
  categoryId: z.string().min(1, 'Category is required.'),
  location: z.string().min(1, 'Location is required.'),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  rating: z.coerce.number().min(0).max(5).optional(),
  featured: z.boolean().optional(),
  verified: z.boolean().optional(),
  imageFile: z.instanceof(File).optional(),
});

type WorkerFormValues = z.infer<typeof workerSchema>;

interface AddWorkerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddWorkerModal({ isOpen, onClose }: AddWorkerModalProps) {
  const firestore = useFirestore();
  const storage = useStorage();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const categoriesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'categories');
  }, [firestore]);
  const { data: categories, isLoading: areCategoriesLoading } = useCollection<Category>(categoriesQuery);

  const servicesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'services');
  }, [firestore]);
  const { data: services, isLoading: areServicesLoading } = useCollection<Service>(servicesQuery);

  const form = useForm<WorkerFormValues>({
    resolver: zodResolver(workerSchema),
    defaultValues: {
      rating: 4.5,
      featured: false,
      verified: true,
    },
  });

  const onSubmit = async (data: WorkerFormValues) => {
    if (!firestore || !storage) return;

    setIsUploading(true);
    let imageUrl = '';
    
    if (data.imageFile) {
      try {
        const storageRef = ref(storage, `workers/${Date.now()}_${data.imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, data.imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast({ title: "Image Upload Failed", description: "Could not upload worker image.", variant: "destructive" });
        setIsUploading(false);
        return;
      }
    } else {
        imageUrl = getLocalImageByName(data.specialization || data.name);
    }

    const { imageFile, ...workerData } = data;
    
    const finalWorkerData = {
        ...workerData,
        image: imageUrl,
        experience: 0, // default experience
    };

    try {
        addWorker(firestore, finalWorkerData as any);
        toast({ title: "Worker Added", description: `${data.name} has been added.` });
        form.reset();
        onClose();
    } catch (error) {
        console.error("Error adding worker:", error);
        toast({ title: "Error", description: "Failed to add worker.", variant: "destructive" });
    } finally {
        setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Worker</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Worker Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="specialization" render={({ field }) => (
              <FormItem>
                <FormLabel>Service Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {areServicesLoading && <SelectItem value="loading" disabled>Loading...</SelectItem>}
                    {services && services.map(service => <SelectItem key={service.id} value={service.name}>{service.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
             <FormField control={form.control} name="categoryId" render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {areCategoriesLoading && <SelectItem value="loading" disabled>Loading...</SelectItem>}
                    {categories && categories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="location" render={({ field }) => (
              <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="price" render={({ field }) => (
              <FormItem><FormLabel>Price (per hour)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="rating" render={({ field }) => (
              <FormItem><FormLabel>Rating</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="flex items-center space-x-4">
                <FormField control={form.control} name="featured" render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm flex-1"><FormLabel>Featured</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="verified" render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm flex-1"><FormLabel>Verified</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>
                )} />
            </div>
            <FormField control={form.control} name="imageFile" render={({ field }) => (
              <FormItem>
                <FormLabel>Worker Image</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={isUploading}>{isUploading ? "Adding..." : "Add Worker"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
