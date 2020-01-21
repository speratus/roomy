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
            image: image_url
        }.to_json
    end
end