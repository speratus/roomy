# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_01_21_135507) do

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.integer "record_id", null: false
    t.integer "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "characteristics", force: :cascade do |t|
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "listings", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.string "address"
    t.integer "monthly_rent"
    t.string "status"
    t.integer "target_roommate_number"
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_listings_on_user_id"
  end

  create_table "personal_characteristics", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "characteristic_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["characteristic_id"], name: "index_personal_characteristics_on_characteristic_id"
    t.index ["user_id"], name: "index_personal_characteristics_on_user_id"
  end

  create_table "preferred_characteristics", force: :cascade do |t|
    t.integer "listing_id", null: false
    t.integer "characteristic_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["characteristic_id"], name: "index_preferred_characteristics_on_characteristic_id"
    t.index ["listing_id"], name: "index_preferred_characteristics_on_listing_id"
  end

  create_table "seeker_applications", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "listing_id", null: false
    t.string "message"
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["listing_id"], name: "index_seeker_applications_on_listing_id"
    t.index ["user_id"], name: "index_seeker_applications_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "listings", "users"
  add_foreign_key "personal_characteristics", "characteristics"
  add_foreign_key "personal_characteristics", "users"
  add_foreign_key "preferred_characteristics", "characteristics"
  add_foreign_key "preferred_characteristics", "listings"
  add_foreign_key "seeker_applications", "listings"
  add_foreign_key "seeker_applications", "users"
end
