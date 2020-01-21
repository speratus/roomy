class UserSerializer

    def self.get_user_avatar(user)
        if user.avatar.attached?
            Rails.application.routes.url_helpers.rails_blob_path(user.avatar, disposition: 'attachment')
        else
            ''
        end
    end

    def self.serialize_user(user)
        {
            id: user.id, 
            username: user.username, 
            name: user.name, 
            type: user.user_type, 
            avatar: UserSerializer.get_user_avatar(user),
            personalCharacteristics: user.characteristics
        }
    end

    def self.serialize_basic_user_info(user)
        {
            id: user.id, 
            name: user.name, 
            avatar: UserSerializer.get_user_avatar(user)
        }
    end
end