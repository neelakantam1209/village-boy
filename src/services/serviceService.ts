
import { SERVICES, CATEGORIES } from '@/lib/data';
import type { Service, Category, Professional } from '@/lib/types';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, Firestore, writeBatch } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


export async function getAllServices(db: Firestore): Promise<Service[]> {
  const servicesCol = collection(db, 'services');
  return getDocs(servicesCol).then(async (serviceSnapshot) => {
    if (serviceSnapshot.empty) {
      // Populate with mock data if the collection is empty
      const batch = writeBatch(db);
      SERVICES.forEach(service => {
        const docRef = doc(db, 'services', service.id);
        batch.set(docRef, service);
      });
      await batch.commit();
      return SERVICES;
    }
    return serviceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
  }).catch(error => {
    errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: 'services',
        operation: 'list',
    }));
    return SERVICES;
  });
}

export async function getAllWorkers(db: Firestore): Promise<Professional[]> {
    const workersCol = collection(db, 'workers');
    return getDocs(workersCol).then(workerSnapshot => {
        if (workerSnapshot.empty) {
            return []; // In a real app, you might seed this, but for now, return empty if not populated.
        }
        return workerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Professional));
    }).catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: 'workers',
            operation: 'list',
        }));
        return [];
    });
}

export async function getAllCategories(db: Firestore): Promise<Category[]> {
    const categoriesCol = collection(db, 'categories');
    return getDocs(categoriesCol).then(async (categorySnapshot) => {
        if (categorySnapshot.empty) {
            return CATEGORIES;
        }
        return categorySnapshot.docs.map(docData => {
            const data = docData.data();
            return { ...data, id: docData.id } as Category;
        });
    }).catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: 'categories',
            operation: 'list',
        }));
        return CATEGORIES;
    });
}

export function addService(db: Firestore, serviceData: Omit<Service, 'id'>) {
    const newDocRef = doc(collection(db, 'services'));
    const dataWithId = { ...serviceData, id: newDocRef.id };
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

export function updateService(db: Firestore, serviceId: string, updates: Partial<Service>) {
    const docRef = doc(db, 'services', serviceId);
    updateDocumentNonBlocking(docRef, updates);
}

export function deleteService(db: Firestore, serviceId: string) {
    const docRef = doc(db, 'services', serviceId);
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
