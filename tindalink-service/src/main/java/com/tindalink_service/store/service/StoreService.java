package com.tindalink_service.store.service;

import com.tindalink_service.common.exception.BadRequestException;
import com.tindalink_service.store.Store;
import com.tindalink_service.store.dto.request.StoreRequest;
import com.tindalink_service.store.dto.response.StoreResponse;
import com.tindalink_service.store.repository.StoreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoreService {

    public final StoreRepository storeRepository;

    private static final String STORE_NOT_FOUND = "Store not found with id";
    private static final String STORE_ALREADY_EXIST= "Store already exist";

    public StoreService (StoreRepository storeRepository){

        this.storeRepository = storeRepository;

    }

    public Store createStore(Store store){

        return storeRepository.save(store);
    }

    public List<StoreResponse> getAllStore(){

        return storeRepository.findAll()
                .stream()
                .map(StoreResponse::toResponse)
                .toList();
    }

    public StoreResponse getByStoreId(String id){

        return storeRepository.findById(id)
                .map(StoreResponse::toBasicResponse)
                .orElseThrow(()-> new RuntimeException(STORE_NOT_FOUND + id));

    }

    public StoreResponse createStore(StoreRequest request){

        if(storeRepository.existsBystoreName(request.getStoreName())){
            throw new BadRequestException(STORE_ALREADY_EXIST + request.getStoreName());

        }
        Store store = request.toEntity(null);
        Store savedStore = storeRepository.save(store);

        return StoreResponse.toBasicResponse(savedStore);
   }


   public StoreResponse updateStore(String id, StoreRequest request){

        Store existingStore = storeRepository.findById(id)
                .orElseThrow(()-> new RuntimeException(STORE_ALREADY_EXIST + request.getStoreName()));

       if(!existingStore.getStoreName().equals(request.getStoreName()) && storeRepository.existsBystoreName(request.getStoreName()))

           throw new BadRequestException(STORE_ALREADY_EXIST + request.getStoreName());

       Store updateUser = request.toEntity(existingStore);
       Store savedStore = storeRepository.save(updateUser);

       return StoreResponse.toBasicResponse(savedStore);

   }


    public void deleteStore(String id){

        if (!storeRepository.existsById(id))
            throw new BadRequestException(STORE_NOT_FOUND + id);

        storeRepository.deleteById(id);



    }
}


