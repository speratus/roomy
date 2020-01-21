require 'json'

class ListingSerializer
    def self.serialize_listing(listing, image_url)
        {
            title: listing.title, 
            description: listing.description,
            address: listing.address,
            rent: listing.monthly_rent,
            status: listing.status,
            targetNumberOfRoommates: listing.target_roommate_number,
            image: image_url,
            user: UserSerializer.serialize_basic_user_info(listing.user, url_for(listing.user))
        }
    end
end