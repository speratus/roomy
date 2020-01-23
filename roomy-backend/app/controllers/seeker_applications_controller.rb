class SeekerApplicationsController < ApplicationController

    def show
        application = SeekerApplication.find_by(id: params[:id])
        render json: SeekerApplicationSerializer.serialize_application(application)
    end

    def create
        application = SeekerApplication.new(application_params)

        if application.save
            render json: SeekerApplicationSerializer.serialize_application(application)
        else
            render json: {
                message: "Invalid Application attributes",
                errors: application.errors.full_messages
            }
        end
    end

    def update
        application = SeekerApplication.find_by(id: params[:id])

        if application.update(application_params)
            render json: SeekerApplicationSerializer.serialize_application(application)
        else
            render json: {
                message: "Invalid Application attributes",
                errors: application.errors.full_messages
            }
        end
    end

    def destroy
        application = SeekerApplication.find_by(id: params[:id])

        if application.destroy
            render json: {
                message: "Successfully deleted application",
                application: SeekerApplicationSerializer.serialize_application(application)
            }
        else
            render json: {
                message: "Failed to delete application"
            }
        end
    end

    private

    def application_params
        params.require(:application).permit(:user_id, :listing_id, :message, :status)
    end

end
