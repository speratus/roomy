require 'json'

class UserSerializer

    def self.serialize_user(user, avatar_url)
        {
            id: user.id, 
            username: user.username, 
            name: user.name, 
            type: user.user_type, 
            avatar: avatar_url
        }
    end

    def self.serialize_basic_user_info(user, avatar_url)
        {
            id: user.id, 
            name: user.name, 
            avatar: avatar_url
        }
    end
end