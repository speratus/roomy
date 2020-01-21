class UsersController < ApplicationController
    def show
        user = User.find_by(id: params[:id])
        render json: UserSerializer.serialize_user(user)
    end

    def create
        user = User.new(user_params)

        if user.save
            render json: UserSerializer.serialize_user(user)
        else
            render json: {message: "Invalid user attributes."}
        end
    end

    private

    def user_params
        params.require(:user).permit(:name, :username, :user_type, :characteristics => [:description])
    end
end
