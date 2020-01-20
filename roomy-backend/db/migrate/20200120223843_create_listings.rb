class CreateListings < ActiveRecord::Migration[6.0]
  def change
    create_table :listings do |t|
      t.string :title
      t.string :description
      t.string :address
      t.integer :monthly_rent
      t.string :status
      t.integer :target_roommate_number
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
