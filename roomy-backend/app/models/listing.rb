class Listing < ApplicationRecord
  belongs_to :user
  has_many :preferred_characteristics, dependent: :destroy
  has_many :characteristics, through: :preferred_characteristics

  has_many :seeker_applications, dependent: :destroy
  has_many :applicants, through: :seeker_applications, source: :user

  has_one_attached :image

  validates :title, :description, :address, :monthly_rent, :status, :user_id, presence: true
  validates :address, uniqueness: true
  validates :status, inclusion: {in: %w(open partially-filled closed)}

  def characteristics=(characteristics)
    self.characteristics.clear
    characteristics.each do |c|
      char = Characteristic.find_or_create_by(description: c[:description])
      self.characteristics << char
    end
  end
end
