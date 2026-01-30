
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFirestore, useStorage } from '@/firebase';
import { addCategory } from '@/services/categoryService';
import { useToast } from '@/hooks/use-toast';
import { getLocalImageByName } from '@/lib/image-utils';

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  slug: z.string().min(1, 'Slug is required.'),
  description: z.string().min(1, 'Description is required.'),
  imageFile: z.instanceof(File).optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
  const firestore = useFirestore();
  const storage = useStorage();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data: CategoryFormValues) => {
    if (!firestore || !storage) return;

    setIsUploading(true);
    let imageUrl = '';
    
    if (data.imageFile) {
      try {
        const storageRef = ref(storage, `categories/${Date.now()}_${data.imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, data.imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast({ title: "Image Upload Failed", description: "Could not upload category image.", variant: "destructive" });
        setIsUploading(false);
        return;
      }
    } else {
        // If no image is uploaded, assign a relevant placeholder from local files
        imageUrl = getLocalImageByName(data.name);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { imageFile, ...categoryData } = data;
    
    const finalCategoryData = {
        ...categoryData,
        image: imageUrl, // Storing URL as 'image' field
        description: data.description,
    };

    try {
        // Pass only serializable data to the service function
        addCategory(firestore, {
            name: finalCategoryData.name,
            slug: finalCategoryData.slug,
            image: finalCategoryData.image,
            description: finalCategoryData.description
        });
        toast({ title: "Category Added", description: `${data.name} has been added.` });
        form.reset();
        onClose();
    } catch (error) {
        console.error("Error adding category:", error);
        toast({ title: "Error", description: "Failed to add category.", variant: "destructive" });
    } finally {
        setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Category Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="slug" render={({ field }) => (
              <FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="imageFile" render={({ field }) => (
              <FormItem>
                <FormLabel>Category Image</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={isUploading}>{isUploading ? "Adding..." : "Add Category"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
