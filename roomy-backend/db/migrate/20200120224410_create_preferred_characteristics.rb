class CreatePreferredCharacteristics < ActiveRecord::Migration[6.0]
  def change
    create_table :preferred_characteristics do |t|
      t.belongs_to :listing, null: false, foreign_key: true
      t.belongs_to :characteristic, null: false, foreign_key: true

      t.timestamps
    end
  end
end
