package com.example.demo.offer;

import com.example.demo.category.Category;
import com.example.demo.post.Post;
import com.example.demo.post.PostRepository;
import com.example.demo.worker.Worker;
import com.example.demo.worker.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OfferService {

    private final OfferRepository offerRepository;
    private final WorkerRepository workerRepository;
    private final PostRepository postRepository;

    @Autowired
    public OfferService(OfferRepository offerRepository, WorkerRepository workerRepository, PostRepository postRepository) {
        this.offerRepository = offerRepository;
        this.workerRepository = workerRepository;
        this.postRepository = postRepository;
    }

    public List<Offer> getOffers() {
        return offerRepository.findAll();
    }

    public Offer getOffer(String id) {
        Integer offer_id = Integer.parseInt(id);
        return offerRepository.findById(offer_id).orElse(null);
    }
    public List<Offer> getAllOffersByPostId(String id) {
        Integer post_id = Integer.parseInt(id);
        List<Offer> offers = offerRepository.findAll();
        List<Offer> postOffers = new ArrayList<>();
        for (Offer temp : offers) {
            if (temp.getPost() != null) {
                if (temp.getPost().getPost_id() == post_id) {
                    postOffers.add(temp);
                }
            }
        }
        return postOffers;
    }
    public List<Offer> getApprovedOffersByWorkerId(String id) {
        Integer worker_id = Integer.parseInt(id);
        List<Offer> offers = offerRepository.findAll();
        List<Offer> workerApprovedOffers = new ArrayList<>();
        for (Offer temp : offers) {
            if (temp.getWorker() != null) {
                if (temp.getWorker().getUser().getId() == worker_id) {
                    if(temp.getOffer_status().toString().equals("Accepted")){
                        workerApprovedOffers.add(temp);
                    }
                }
            }
        }
        return workerApprovedOffers;
    }

    public Offer addOffer(Offer offer, Integer worker_id, Integer post_id) {
        Worker worker = workerRepository.findByUserId(worker_id);
        Post post = postRepository.findById(post_id).orElse(null);
        offer.setWorker(worker);
        offer.setPost(post);
        return offerRepository.save(offer);
    }

    public void deleteOffer(String id) {
        Integer offer_id = Integer.parseInt(id);
        offerRepository.deleteById(offer_id);
    }

    public void updateOfferStatus(String id, String status) {
        Integer offer_id = Integer.parseInt(id);
        Offer offer = offerRepository.findById(offer_id).orElse(null);
        if (offer != null){
            offer.setOffer_status(status);
            offerRepository.save(offer);
        }
    }
}
