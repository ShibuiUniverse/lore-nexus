export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      character_events: {
        Row: {
          character_id: string
          created_at: string
          event_id: string
          id: string
          role: string | null
        }
        Insert: {
          character_id: string
          created_at?: string
          event_id: string
          id?: string
          role?: string | null
        }
        Update: {
          character_id?: string
          created_at?: string
          event_id?: string
          id?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "character_events_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_events_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "timeline_events"
            referencedColumns: ["id"]
          },
        ]
      }
      characters: {
        Row: {
          abilities: string | null
          backstory: string | null
          created_at: string
          description: string | null
          era_id: string | null
          faction: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          name: string
          people_group_id: string | null
          sort_order: number | null
          title: string | null
          updated_at: string
        }
        Insert: {
          abilities?: string | null
          backstory?: string | null
          created_at?: string
          description?: string | null
          era_id?: string | null
          faction?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          name: string
          people_group_id?: string | null
          sort_order?: number | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          abilities?: string | null
          backstory?: string | null
          created_at?: string
          description?: string | null
          era_id?: string | null
          faction?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          name?: string
          people_group_id?: string | null
          sort_order?: number | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "characters_era_id_fkey"
            columns: ["era_id"]
            isOneToOne: false
            referencedRelation: "eras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "characters_people_group_id_fkey"
            columns: ["people_group_id"]
            isOneToOne: false
            referencedRelation: "people_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      eras: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          end_year: number | null
          id: string
          name: string
          sort_order: number | null
          start_year: number | null
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          end_year?: number | null
          id?: string
          name: string
          sort_order?: number | null
          start_year?: number | null
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          end_year?: number | null
          id?: string
          name?: string
          sort_order?: number | null
          start_year?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          created_at: string
          culture: string | null
          description: string | null
          history: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          name: string
          region: string | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          culture?: string | null
          description?: string | null
          history?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          name: string
          region?: string | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          culture?: string | null
          description?: string | null
          history?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          name?: string
          region?: string | null
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      people_groups: {
        Row: {
          created_at: string
          culture_text: string | null
          description: string | null
          homeland_id: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          name: string
          sort_order: number | null
          traditions: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          culture_text?: string | null
          description?: string | null
          homeland_id?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          name: string
          sort_order?: number | null
          traditions?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          culture_text?: string | null
          description?: string | null
          homeland_id?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          name?: string
          sort_order?: number | null
          traditions?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "people_groups_homeland_id_fkey"
            columns: ["homeland_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      stories: {
        Row: {
          content: string | null
          created_at: string
          description: string | null
          era_id: string | null
          id: string
          is_featured: boolean | null
          sort_order: number | null
          story_type: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          description?: string | null
          era_id?: string | null
          id?: string
          is_featured?: boolean | null
          sort_order?: number | null
          story_type?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          description?: string | null
          era_id?: string | null
          id?: string
          is_featured?: boolean | null
          sort_order?: number | null
          story_type?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stories_era_id_fkey"
            columns: ["era_id"]
            isOneToOne: false
            referencedRelation: "eras"
            referencedColumns: ["id"]
          },
        ]
      }
      timeline_events: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          era_id: string | null
          event_type: string
          full_content: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          reading_time: number | null
          sort_order: number | null
          title: string
          updated_at: string
          video_url: string | null
          year: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          era_id?: string | null
          event_type?: string
          full_content?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          reading_time?: number | null
          sort_order?: number | null
          title: string
          updated_at?: string
          video_url?: string | null
          year?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          era_id?: string | null
          event_type?: string
          full_content?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          reading_time?: number | null
          sort_order?: number | null
          title?: string
          updated_at?: string
          video_url?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "timeline_events_era_id_fkey"
            columns: ["era_id"]
            isOneToOne: false
            referencedRelation: "eras"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
