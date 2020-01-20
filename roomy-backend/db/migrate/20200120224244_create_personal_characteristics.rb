class CreatePersonalCharacteristics < ActiveRecord::Migration[6.0]
  def change
    create_table :personal_characteristics do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :characteristic, null: false, foreign_key: true

      t.timestamps
    end
  end
end
