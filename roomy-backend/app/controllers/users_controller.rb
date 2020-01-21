class UsersController < ApplicationController
    def show
        user = User.find_by(id: params[:id])
        render json: UserSerializer.serialize_user(user)
    end
end
