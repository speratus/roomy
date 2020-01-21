class Listing < ApplicationRecord
  belongs_to :user
  has_many :preferred_characteristics
  has_many :characteristics, through: :preferred_characteristics

  has_one_attached :image

  validates :title, :description, :address, :monthly_rent, :status, :user_id, presence: true
  validates :address, uniqueness: true
  validates :status, inclusion: {in: %w(open partially-filled closed)}
end
