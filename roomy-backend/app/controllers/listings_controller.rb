class ListingsController < ApplicationController

    def index
        listings = Listing.all
        render json: ListingSerializer.serialize_all(listings)
    end

    def show
        listing = Listing.find_by(id: params[:id])
        image_url = listing.image.attached? ? url_for(listing.image) : ""
        render json: ListingSerializer.serialize_listing(listing, image_url)
    end

end
