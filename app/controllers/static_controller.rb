class StaticController < ApplicationController
  def index
    @measures = Measure.all
  end
end
