import MessageNode from './MessageNode';
import QuestionNode from './QuestionNode';
import ConditionNode from './ConditionNode';
import ActionNode from './ActionNode';
import DelayNode from './DelayNode';
import IntegrationNode from './IntegrationNode';
import TriggerNode from './TriggerNode';

export const nodeTypes = {
  triggerNode: TriggerNode,
  messageNode: MessageNode,
  questionNode: QuestionNode,
  conditionNode: ConditionNode,
  actionNode: ActionNode,
  delayNode: DelayNode,
  integrationNode: IntegrationNode
}; 