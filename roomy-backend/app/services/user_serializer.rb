require 'json'

class UserSerializer

    def self.serialize_user(user, avatar_url)
        {username: user.username, name: user.name, type: user.type, avatar: avatar_url}.to_json
    end
end