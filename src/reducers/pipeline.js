import { PipelineAction } from '../actions/pipeline';

const pipeline = (state = {}, action) => {
  switch (action.type) {
    case PipelineAction.DISPLAY_BOUNDING_BOX:
      return {
        ...state,
        imageUrl: action.imageUrl,
        rect: action.rect,
      };
    case PipelineAction.DISPLAY_CROPPED_BOX:
      return {
        ...state,
        croppedUrl: action.croppedUrl,
      };
    case PipelineAction.DISPLAY_CENTERED_BOX:
      return {
        ...state,
        centeredUrl: action.centeredUrl,
      };
    case PipelineAction.DISPLAY_NORMALIZED_BOX:
      return {
        ...state,
        normalizedUrl: action.normalizedUrl,
      };
    default:
      return state;
  }
};

export default pipeline;
