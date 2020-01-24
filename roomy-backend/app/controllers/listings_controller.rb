class ListingsController < ApplicationController

    def index
        listings = Listing.all
        render json: ListingSerializer.serialize_all(listings)
    end

    def show
        listing = Listing.find_by(id: params[:id])
        if params[:showApplications]
            render json: ListingSerializer.serialize_with_applications(listing)
        else
            render json: ListingSerializer.serialize_listing(listing)
        end
    end

    def create
        listing = Listing.new(listing_params)

        if listing.save
            render json: ListingSerializer.serialize_listing(listing)
        else
            render json: {
                message: "Invalid Listing attributes",
                errors: listing.errors.full_messages
            }
        end
    end

    def update
        listing = Listing.find_by(id: params[:id])

        if listing.update(listing_params)
            render json: ListingSerializer.serialize_listing(listing)
        else
            render json: {
                message: "Invalid Listing attributes",
                errors: listing.errors.full_messages
            }
        end
    end

    def destroy
        listing = Listing.find_by(id: params[:id])

        if listing.destroy
            render json: {
                message: "Successfully deleted listing",
                listing: listing
            }
        else
            render json: {
                message: "Failed to delete listing"
            }
        end
    end

    private

    def listing_params
        params.require(:listing).permit(
            :title, 
            :description, 
            :address, 
            :monthly_rent, 
            :status, 
            :target_roommate_number, 
            :user_id,
            :image,
            characteristics: [:description]
        )
    end

end
