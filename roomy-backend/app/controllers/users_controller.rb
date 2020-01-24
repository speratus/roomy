class UsersController < ApplicationController
    def show
        user = User.find_by(id: params[:id])
        if params[:showApplications]
            render json: UserSerializer.serialize_with_applications(user)
        else
            render json: UserSerializer.serialize_user(user)
        end
    end

    def create
        user = User.new(user_params)

        if user.save
            render json: params[:showApplications] ? UserSerializer.serialize_with_applications(user) : UserSerializer.serialize_user(user)
        else
            render json: {
                message: "Invalid user attributes.",
                errors: user.errors.full_messages
            }
        end
    end

    def update
        user = User.find_by(id: params[:id])

        if user.update(user_params)
            render json: UserSerializer.serialize_user(user)
        else
            render json: {
                message: "Invalid user attributes.",
                errors: user.errors.full_messages
            }
        end
    end

    def destroy
        user = User.find_by(id: params[:id])

        if user.destroy
            render json: {
                message: "Successfully destroyed user",
                user: user
            }
        else
            render json: {
                message: "Failed to destroy the user."
            }
        end
    end

    private

    def user_params()
        params.require(:user).permit(:name, :username, :user_type, :avatar, characteristics: [:description])
    end

end
