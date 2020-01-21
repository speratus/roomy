class UsersController < ApplicationController
    def show
        user = User.find_by(id: params[:id])
        url = user.avatar.attached? ? url_for(user.avatar) : ""
        render json: UserSerializer.serialize_user(user, url)
    end
end
