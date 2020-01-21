# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'Faker'

User.delete_all
Listing.delete_all

5.times do
    User.create(name: Faker::Name.name, username: Faker::Internet.email, user_type: 'RoomHost')
end

rand = Random.new

5.times do
    Listing.create(
        title: 'Just your average place',
        description: Faker::Hipster.paragraph(sentence_count: 3),
        address: Faker::Address.full_address,
        monthly_rent: rand.rand(2000),
        status: 'open',
        target_roommate_number: rand.rand(6),
        user_id: User.all.sample.id
    )
end
