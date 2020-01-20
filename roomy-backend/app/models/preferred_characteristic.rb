class PreferredCharacteristic < ApplicationRecord
  belongs_to :listing
  belongs_to :characteristic
end
