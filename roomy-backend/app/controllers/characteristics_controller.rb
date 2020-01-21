class CharacteristicsController < ApplicationController

    def create
        characteristic = Characteristic.new(characteristic_params)

        if characteristic.save
            render json: characteristic
        else
            render json: {message: 'Invalid characteristic attributes'}
        end
    end

    def index
        characteristics = Characteristic.all
        render json: characteristics, only: [:id, :description]
    end

    def update
        characteristic = Characteristic.find_by(id: params[:id])
        if characteristic.update(characteristic_params)
            render json: characteristic
        else
            render json: {message: 'Invalid characteristic attributes'}
        end
    end

    private

    def characteristic_params
        params.require(:characteristic).permit(:description)
    end

end
