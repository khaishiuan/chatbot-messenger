class FlowService {
  async saveFlow(flowData) {
    try {
      const response = await fetch('/api/flows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flowData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving flow:', error);
      throw error;
    }
  }

  async loadFlow(flowId) {
    try {
      const response = await fetch(`/api/flows/${flowId}`);
      return await response.json();
    } catch (error) {
      console.error('Error loading flow:', error);
      throw error;
    }
  }
}

export default new FlowService(); 