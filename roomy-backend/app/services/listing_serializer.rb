class ListingSerializer

    def self.get_image_url_for(listing)
        if listing.image.attached?
            'http://localhost:3000' + Rails.application.routes.url_helpers.rails_blob_path(listing.image, disposition: 'attachment', host: 'http://localhost:3000/')
        else
            ''
        end
    end

    def self.serialize_listing(listing)
        {
            id: listing.id,
            title: listing.title, 
            description: listing.description,
            address: listing.address,
            rent: listing.monthly_rent,
            status: listing.status,
            targetNumberOfRoommates: listing.target_roommate_number,
            image: ListingSerializer.get_image_url_for(listing),
            user: UserSerializer.serialize_basic_user_info(listing.user),
            updatedAt: listing.updated_at,
            preferredCharacteristics: listing.characteristics
        }
    end

    def self.serialize_all(listings)
        listings.map { |listing|
            ListingSerializer.serialize_listing(listing)
        }
    end

    def self.serialize_basic_info(listing)
        {
            id: listing.id,
            title: listing.title,
            description: listing.description,
            address: listing.address,
            image: ListingSerializer.get_image_url_for(listing)
        }
    end

    def self.serialize_with_applications(listing)
        output = ListingSerializer.serialize_listing(listing)
        output[:applications] = SeekerApplicationSerializer.serialize_all(listing.seeker_applications)
        output
    end

    def self.serialize_with_users_application(listing, application)
        output = ListingSerializer.serialize_listing(listing)
        output[:application] = SeekerApplicationSerializer.serialize_application(application)
        output
    end
end