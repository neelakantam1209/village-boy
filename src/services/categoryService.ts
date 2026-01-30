
import { CATEGORIES } from '@/lib/data';
import type { Category } from '@/lib/types';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, Firestore, writeBatch } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


export async function getAllCategories(db: Firestore): Promise<Category[]> {
    const categoriesCol = collection(db, 'categories');
    return getDocs(categoriesCol).then(async (categorySnapshot) => {
        if (categorySnapshot.empty) {
            // Populate with mock data if the collection is empty
            const batch = writeBatch(db);
            CATEGORIES.forEach(category => {
                const docRef = doc(db, 'categories', category.id);
                batch.set(docRef, category);
            });
            await batch.commit();
            return CATEGORIES;
        }
        return categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
    }).catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: 'categories',
            operation: 'list',
        }));
        return CATEGORIES;
    });
}

// Use a specific type for data being added to Firestore to ensure serializability
type FirestoreCategoryData = {
    name: string;
    slug: string;
    description: string;
    image: string;
};

export function addCategory(db: Firestore, categoryData: FirestoreCategoryData) {
    const newDocRef = doc(collection(db, "categories"));
    const dataWithId = { ...categoryData, id: newDocRef.id };
    
    setDoc(newDocRef, dataWithId)
        .catch(error => {
            errorEmitter.emit(
                'permission-error',
                new FirestorePermissionError({
                    path: newDocRef.path,
                    operation: 'create',
                    requestResourceData: dataWithId,
                })
            );
        });
}

export function updateCategory(db: Firestore, categoryId: string, updates: Partial<Category>) {
    const docRef = doc(db, 'categories', categoryId);
    updateDocumentNonBlocking(docRef, updates);
}

export function deleteCategory(db: Firestore, categoryId: string) {
    const docRef = doc(db, 'categories', categoryId);
    deleteDoc(docRef).catch(error => {
        errorEmitter.emit(
            'permission-error',
            new FirestorePermissionError({
                path: docRef.path,
                operation: 'delete',
            })
        );
    });
}
