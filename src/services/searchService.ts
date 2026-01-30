import type { Service, Professional } from '@/lib/types';
import { getAllServices } from './serviceService';
import { getAllWorkers } from './workerService';
import { Firestore } from 'firebase/firestore';

/**
 * Searches for services and workers based on query and location.
 * @param serviceQuery - The search term for services (name, category, description).
 * @param locationQuery - The search term for location.
 * @returns A promise that resolves to an object containing filtered services and workers.
 */
export async function searchServicesAndWorkers(
  firestore: Firestore,
  serviceQuery: string | null,
  locationQuery: string | null
): Promise<{ services: Service[]; workers: Professional[] }> {
  const [allServices, allWorkers] = await Promise.all([
    getAllServices(firestore),
    getAllWorkers(firestore),
  ]);

  const lowerCaseServiceQuery = (serviceQuery || '').toLowerCase();
  const lowerCaseLocationQuery = (locationQuery || '').toLowerCase();

  const filteredServices = allServices.filter(service => {
    const matchesService = lowerCaseServiceQuery
      ? ((service.name || '').toLowerCase().includes(lowerCaseServiceQuery)) ||
        ((service.category || '').toLowerCase().includes(lowerCaseServiceQuery)) ||
        ((service.description || '').toLowerCase().includes(lowerCaseServiceQuery))
      : true;

    const matchesLocation = lowerCaseLocationQuery
      ? ((service.location || '').toLowerCase().includes(lowerCaseLocationQuery))
      : true;
      
    return matchesService && matchesLocation;
  });

  const filteredWorkers = allWorkers.filter(worker => {
    const matchesService = lowerCaseServiceQuery
      ? ((worker.name || '').toLowerCase().includes(lowerCaseServiceQuery)) ||
        ((worker.specialization || '').toLowerCase().includes(lowerCaseServiceQuery))
      : true;

    const matchesLocation = lowerCaseLocationQuery
      ? ((worker.location || '').toLowerCase().includes(lowerCaseLocationQuery))
      : true;

    // Independent search logic
    if (lowerCaseServiceQuery && !lowerCaseLocationQuery) {
        return matchesService;
    }
    if (!lowerCaseServiceQuery && lowerCaseLocationQuery) {
        return matchesLocation;
    }
    if (lowerCaseServiceQuery && lowerCaseLocationQuery) {
        return matchesService && matchesLocation;
    }
    // If both queries are empty, return all workers (or handle as per requirement)
    if (!lowerCaseServiceQuery && !lowerCaseLocationQuery) {
        return true; 
    }

    return matchesService && matchesLocation;
  });

  // If no specific query is given, don't return all services.
  if (!serviceQuery && !locationQuery) {
    return { services: [], workers: [] };
  }


  return { services: filteredServices, workers: filteredWorkers };
}
