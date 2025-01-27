package com.example.demo.offer;

import com.example.demo.post.Post;
import com.example.demo.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("offer")
@CrossOrigin("*")
public class OfferController {

    private final OfferService offerService;

    @Autowired
    public OfferController(OfferService offerService) {
        this.offerService = offerService;
    }

    @GetMapping
    public List<Offer> getOffers(){
        return offerService.getOffers();
    }

    @GetMapping("{id}")
    public Offer getOffer(@PathVariable String id){
        return offerService.getOffer(id);
    }

    @GetMapping("post/{id}")
    public List<Offer> getAllOffersByPostId(@PathVariable String id){ return offerService.getAllOffersByPostId(id); }

    @GetMapping("worker/{id}")
    public List<Offer> getAllOffersByWorkerId(@PathVariable String id){ return offerService.getApprovedOffersByWorkerId(id); }

    @PostMapping
    public Offer addOffer(@RequestBody Form form){
        return offerService.addOffer(form.getOffer(), form.getWorker_id(), form.getPost_id());
    }

    @PutMapping("/{id}")
    public void updateOfferStatus(@PathVariable String id, @RequestBody Form formData){
        offerService.updateOfferStatus(id, formData.getOffer().getOffer_status());
    }

    @DeleteMapping("{id}")
    public void deleteOffer(@PathVariable String id){
        offerService.deleteOffer(id);
    }

}

class Form{
    private Offer offer;
    private Integer worker_id;
    private Integer post_id;

    public Form(Offer offer, Integer worker_id, Integer post_id) {
        this.offer = offer;
        this.worker_id = worker_id;
        this.post_id = post_id;
    }

    public Offer getOffer() {
        return offer;
    }

    public Integer getWorker_id() {
        return worker_id;
    }

    public Integer getPost_id() {
        return post_id;
    }
}
