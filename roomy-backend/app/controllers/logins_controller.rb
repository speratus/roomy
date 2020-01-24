class LoginsController < ApplicationController

    def login
        user = User.find_by(username: params[:username])

        if user
            render json: {
                success: true,
                message: "You have been logged in as #{user.username}.",
                user: params[:showApplications] ? UserSerializer.serialize_with_applications(user) : UserSerializer.serialize_user(user)
            }
        else
            render json: {
                success: false,
                message: "Sorry, that user does not exist please try again or sign up."
            }
        end
    end
end
