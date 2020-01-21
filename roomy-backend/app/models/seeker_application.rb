class SeekerApplication < ApplicationRecord
  belongs_to :user
  belongs_to :listing

  validates :message, :status, presence: true
  validates :status, inclusion: {in: %w(applied rejected accepted closed)}
end
