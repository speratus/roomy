class SeekerApplicationSerializer

    def self.serialize_application(application)
        {
            id: application.id,
            message: application.message,
            status: application.status,
            applicant: UserSerializer.serialize_basic_user_info(application.user),
            listing: ListingSerializer.serialize_basic_info(application.listing)
        }
    end

end