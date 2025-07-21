const BASE_URL = 'https://enginer.app.n8n.cloud';

// Different webhook URLs for different operations
const WEBHOOK_URL = `${BASE_URL}/webhook/9f79471d-b9ba-48c3-97f2-cccaa3df9655`;


export interface InitialAnalysisItem {
  score: number;
  assessment: string;
  summary: string;
}

export interface InitialAnalysis {
  [key: string]: InitialAnalysisItem;
}

export interface InitialAnalysisData {

        business_idea: string;
        analysis: InitialAnalysis;
        user_id: string;
        idea_id: string;
}

export interface PainPointData {

        selected_pain_point: {
          pain_point_title: string;
          detailed_description: string;
          ai_applicability_score: number;
          business_impact_potential: number;
        };
      };


export interface SubmitIdeaRequest {
  idea: string;
  user_id: string;
}

export interface SubmitIdeaResponse {
  _id: string;
}



export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  cost: number;
  is_byok: boolean;
  prompt_tokens_details: {
    cached_tokens: number;
  };
  cost_details: {
    upstream_inference_cost: number | null;
  };
  completion_tokens_details: {
    reasoning_tokens: number;
  };
}

export interface IdeaObject {
    _id: string;
    idea: string;
    user_id: string;
    initial_analyze: {
      data: {
        business_idea: string;
        analysis: InitialAnalysis;
        strengths: Array<{
          name: string;
          score: number;
          analysis: string;
        }>;
        challenges: Array<{
          name: string;
          score: number;
          analysis: string;
        }>;
        overall_assessment: {
          viability_score: number;
          assessment: string;
          recommendation: string;
        };
        final_verdict: {
          score: string;
          assestment: string;
          description: string;
        };
      };
      model: string;
      usage: Usage;
    };
    ai_pain_point_analysis: {
      data: {
        selected_pain_point: {
          pain_point_title: string;
          description: string;
          affected_stakeholders: string[];
          current_solution_gaps: string[];
          ai_applicability_score: number;
          selection_rationale: string;
          business_impact_potential: number;
        };
        ai_solution_approach: {
          title: string;
          description: string;
          ai_technologies_required: string[];
          technical_complexity: string;
          data_requirements: string[];
          model_types: string[];
          integration_challenges: string[];
          development_timeline: string;
        };
        competitive_analysis: {
          existing_ai_solutions: string[];
          competitive_gaps: string[];
          differentiation_opportunities: string[];
          sustainable_advantage_potential: number;
          market_positioning: string;
        };
        success_metrics: Array<{
          metric_name: string;
          measurement_method: string;
          target_improvement: string;
          baseline_current_state: string;
        }>;
        risk_assessment: Array<{
          risk_type: string;
          probability: string;
          impact: string;
          mitigation_strategy: string;
        }>;
      };
      usage: Usage;
      duration: number;
      model: string;
    };
    technical_solution: {
      data: {
        solution_overview: {
          solution_name: string;
          core_functionality: string;
          user_workflow: string[];
          key_features: string[];
          value_proposition: string;
        };
        technical_architecture: {
          tech_stack: {
            frontend: string[];
            backend: string[];
            database: string[];
            ai_ml_components: string[];
            third_party_apis: string[];
            cloud_infrastructure: string[];
          };
          system_components: Array<{
            component_name: string;
            purpose: string;
            technology: string;
            complexity: string;
            dependencies: string[];
          }>;
          data_flow: string[];
          integration_points: string[];
        };
        ai_implementation: {
          model_selection: string;
          training_approach: string;
          data_pipeline: string[];
          inference_method: string;
          performance_requirements: string[];
          accuracy_targets: string[];
        };
        development_plan: {
          timeline: string;
          team_requirements: string[];
          development_phases: Array<{
            phase_name: string;
            duration: string;
            deliverables: string[];
            success_criteria: string[];
            resource_requirements: string;
          }>;
          estimated_costs: {
            development: string;
            infrastructure: string;
            third_party_services: string;
            ongoing_maintenance: string;
          };
        };
        scalability_considerations: {
          performance_bottlenecks: string[];
          scaling_strategies: string[];
          infrastructure_requirements: string[];
        };
      };
      usage: Usage;
      duration: number;
      model: string;
    };
    prototype_description: {
      data: {
        prototype_overview: {
          name: string;
          tagline: string;
          core_value_proposition: string;
          target_users: string[];
          primary_use_case: string;
          business_context: string;
        };
        features: Array<{
          feature_name: string;
          description: string;
          user_benefit: string;
          technical_complexity: string;
          priority: string;
          validation_metric: string;
        }>;
        user_interface: {
          interface_type: string;
          key_screens: Array<{
            screen_name: string;
            purpose: string;
            main_elements: string[];
            user_actions: string[];
            success_indicators: string[];
          }>;
          design_principles: string[];
          accessibility_considerations: string[];
        };
        technical_implementation: {
          ai_integration: string;
          data_sources: string[];
          api_endpoints: string[];
          performance_targets: string[];
          security_requirements: string[];
        };
        validation_metrics: Array<{
          metric: string;
          measurement: string;
          success_threshold: string;
          collection_method: string;
        }>;
        user_testing_plan: {
          testing_methods: string[];
          target_participants: string[];
          success_criteria: string[];
        };
        prototype_limitations: string[];
        next_iteration_features: string[];
      };
      usage: Usage;
      duration: number;
      model: string;
    };

}

class ApiService {
  private async makeRequest<T>(
    endpoint: string, 
    data: any,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify({_endpoint: endpoint, ...data}),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async submitIdea(request: SubmitIdeaRequest): Promise<SubmitIdeaResponse> {
    return this.makeRequest<SubmitIdeaResponse>('submit_idea', request);
  }

  async triggerInitialAnalyse(ideaId: string): Promise<IdeaObject> {
    return this.makeRequest<IdeaObject>('run_initial_analysis', { idea_id: ideaId });
  }

  async triggerPainPointAnalysis(ideaId: string): Promise<IdeaObject> {
    return this.makeRequest<IdeaObject>('run_pain_point_analysis', { idea_id: ideaId });
  }

  async triggerSolutionAnalysis(ideaId: string): Promise<IdeaObject> {
    return this.makeRequest<IdeaObject>('run_solution', { idea_id: ideaId });
  }

  async triggerPrototypeAnalysis(ideaId: string): Promise<IdeaObject> {
    return this.makeRequest<IdeaObject>('run_prototype', { idea_id: ideaId });
  }

  async getIdeaObject(ideaId: string): Promise<IdeaObject> {
    return this.makeRequest<IdeaObject>('get_idea', { idea_id: ideaId });
  }
}

export const apiService = new ApiService();