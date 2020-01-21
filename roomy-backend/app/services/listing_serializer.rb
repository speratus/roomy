require 'json'

class ListingSerializer

    def self.get_image_url_for(listing)
        if listing.user.avatar.attached?
            Rails.application.routes.url_helpers.rails_blob_path(listing.user.avatar, disposition: 'attachment')
        else
            ''
        end
    end

    def self.serialize_listing(listing, image_url)
        
        if listing.user.avatar.attached?
            user_avatar_url = Rails.application.routes.url_helpers.rails_blob_path(listing.user.avatar, disposition: 'attachment')
        else
            user_avatar_url = ''
        end

        {
            title: listing.title, 
            description: listing.description,
            address: listing.address,
            rent: listing.monthly_rent,
            status: listing.status,
            targetNumberOfRoommates: listing.target_roommate_number,
            image: image_url,
            user: UserSerializer.serialize_basic_user_info(listing.user, user_avatar_url),
            updatedAt: listing.updated_at,
            preferredCharacteristics: listing.characteristics
        }
    end

    def self.serialize_all(listings)
        listings.map { |listing|
            ListingSerializer.serialize_listing(listing, ListingSerializer.get_image_url_for(listing))
        }
    end
end