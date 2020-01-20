class CreateSeekerApplications < ActiveRecord::Migration[6.0]
  def change
    create_table :seeker_applications do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :listing, null: false, foreign_key: true
      t.string :message
      t.string :status

      t.timestamps
    end
  end
end
