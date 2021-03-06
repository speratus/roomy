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

    def self.serialize_all(applications)
        applications.map {|a| SeekerApplicationSerializer.serialize_application(a)}
    end

end