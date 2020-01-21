class ListingsController < ApplicationController

    def index
        listings = Listing.all
        render json: ListingSerializer.serialize_all(listings)
    end

    def show
        listing = Listing.find_by(id: params[:id])
        render json: ListingSerializer.serialize_listing(listing)
    end

end
