class Listing < ApplicationRecord
  belongs_to :user
  has_many :preferred_characteristics
  has_many :characteristics, through: :preferred_characteristics

  has_one_attached :image
end
