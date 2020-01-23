class UserSerializer

    def self.get_user_avatar(user)
        if user.avatar.attached?
            'http://localhost:3000' + Rails.application.routes.url_helpers.rails_blob_path(user.avatar, disposition: 'attachment', host: 'http://localhost:3000/')
        else
            ''
        end
    end

    def self.serialize_user(user)
        user_data = {
            id: user.id, 
            username: user.username, 
            name: user.name, 
            type: user.user_type, 
            avatar: UserSerializer.get_user_avatar(user),
            personalCharacteristics: user.characteristics
        }

        if user.is_room_host
            user_data['listingId'] = user.listing.id
        end
        
        user_data
    end

    def self.serialize_basic_user_info(user)
        {
            id: user.id, 
            name: user.name, 
            avatar: UserSerializer.get_user_avatar(user)
        }
    end
end