class ListingsController < ApplicationController

    def show
        listing = Listing.find_by(id: params[:id])
        image_url = listing.image.attached? ? url_for(listing.image) : ""
        render json: ListingSerializer.serialize_listing(listing, image_url)
    end

end
