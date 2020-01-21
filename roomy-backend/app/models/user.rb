class User < ApplicationRecord
    has_one :listing

    has_many :personal_characteristics
    has_many :characteristics, through: :personal_characteristics

    has_one_attached :avatar

    accepts_nested_attributes_for :characteristics

    def is_room_host
        self.type == 'RoomHost'
    end

    def is_room_seeker
        self.type == 'RoomSeeker'
    end
end
