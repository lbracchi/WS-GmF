import EventModel, { EventDocument } from '../models/eventModel';
import ControllerFactory from '../utils/controllerFactory';

const factory = new ControllerFactory<EventDocument>()

export default class EventController {

	add = factory.add(EventModel)
	listAll = factory.findMany(EventModel)

}