class User < ApplicationRecord
    has_one :listing, dependent: :destroy

    has_many :personal_characteristics, dependent: :destroy
    has_many :characteristics, through: :personal_characteristics
    has_many :seeker_applications, through: :listing
    has_many :applicants, through: :listing

    has_many :applications, class_name: 'SeekerApplication'

    has_one_attached :avatar

    accepts_nested_attributes_for :characteristics

    validates :name, :username, :user_type, presence: true
    validates :user_type, inclusion: {in: %w(RoomHost RoomSeeker)}
    validates :username, uniqueness: true

    def is_room_host
        self.user_type == 'RoomHost'
    end

    def is_room_seeker
        self.user_type == 'RoomSeeker'
    end

    def characteristics=(characteristics)
        self.characteristics.clear
        characteristics.each do |char|
            characteristic = Characteristic.find_or_create_by(description: char[:description])
            self.characteristics << characteristic
        end
    end
end
