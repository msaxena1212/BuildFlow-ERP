import { Injectable } from '@angular/core';

export interface TaskDependency {
  predecessorId: string;
  type: 'FS' | 'SS' | 'FF' | 'SF';
  lag: number;
}

@Injectable({
  providedIn: 'root'
})
export class CpmService {
  
  /**
   * Calculates Early Start, Early Finish, Late Start, Late Finish, and Floats
   * @param tasks List of tasks for a project
   * @param projectStartDate The base start date of the project (default: Today)
   */
  calculateSchedule(tasks: any[], projectStartDate: Date = new Date()): any[] {
    if (!tasks || tasks.length === 0) return [];

    // Clone tasks to avoid mutating the original until we are done
    const calculatedTasks = JSON.parse(JSON.stringify(tasks));

    // Convert dates to numeric offsets (days) for calculation
    calculatedTasks.forEach((t: any) => {
      t.duration = t.duration || 1;
      t._es = 0; 
      t._ef = 0;
      t._ls = 0;
      t._lf = 0;
    });

    // 1. Forward Pass (Early Start / Early Finish)
    let changed = true;
    let iterations = 0;
    const maxIterations = tasks.length * 2; // Prevent infinite loops in case of cycles

    while (changed && iterations < maxIterations) {
      changed = false;
      iterations++;
      
      calculatedTasks.forEach((task: any) => {
        let maxES = 0;
        
        if (task.dependencies && task.dependencies.length > 0) {
          task.dependencies.forEach((dep: any) => {
            const pred = calculatedTasks.find((t: any) => t.id === dep.predecessorId);
            if (!pred) return;

            let dependencyES = 0;
            switch (dep.type) {
              case 'FS': dependencyES = pred._ef + (dep.lag || 0); break;
              case 'SS': dependencyES = pred._es + (dep.lag || 0); break;
              case 'FF': dependencyES = pred._ef + (dep.lag || 0) - task.duration; break;
              case 'SF': dependencyES = pred._es + (dep.lag || 0) - task.duration; break;
            }
            if (dependencyES > maxES) maxES = dependencyES;
          });
        }
        
        const newEF = maxES + task.duration;
        if (task._es !== maxES || task._ef !== newEF) {
          task._es = maxES;
          task._ef = newEF;
          changed = true;
        }
      });
    }

    // 2. Backward Pass (Late Start / Late Finish)
    const projectFinishDay = Math.max(...calculatedTasks.map((t: any) => t._ef));
    calculatedTasks.forEach((t: any) => {
      t._lf = projectFinishDay;
      t._ls = projectFinishDay - t.duration;
    });

    changed = true;
    iterations = 0;
    while (changed && iterations < maxIterations) {
      changed = false;
      iterations++;

      calculatedTasks.forEach((task: any) => {
        let minLF = projectFinishDay;
        
        // Find successors of this task
        const successors = calculatedTasks.filter((t: any) => 
          t.dependencies && t.dependencies.some((d: any) => d.predecessorId === task.id)
        );

        if (successors.length > 0) {
          successors.forEach((succ: any) => {
            const dep = succ.dependencies.find((d: any) => d.predecessorId === task.id);
            let dependencyLF = projectFinishDay;
            
            switch (dep.type) {
              case 'FS': dependencyLF = succ._ls - (dep.lag || 0); break;
              case 'SS': dependencyLF = succ._ls - (dep.lag || 0) + task.duration; break;
              case 'FF': dependencyLF = succ._lf - (dep.lag || 0); break;
              case 'SF': dependencyLF = succ._lf - (dep.lag || 0) + task.duration; break;
            }
            if (dependencyLF < minLF) minLF = dependencyLF;
          });
        }

        const newLS = minLF - task.duration;
        if (task._lf !== minLF || task._ls !== newLS) {
          task._lf = minLF;
          task._ls = newLS;
          changed = true;
        }
      });
    }

    // 3. Finalize results and convert offsets back to Date strings
    calculatedTasks.forEach((t: any) => {
      t.earlyStart = this.addDays(projectStartDate, t._es).toISOString().split('T')[0];
      t.earlyFinish = this.addDays(projectStartDate, t._ef).toISOString().split('T')[0];
      t.lateStart = this.addDays(projectStartDate, t._ls).toISOString().split('T')[0];
      t.lateFinish = this.addDays(projectStartDate, t._lf).toISOString().split('T')[0];
      t.totalFloat = t._lf - t._ef;
      t.freeFloat = this.calculateFreeFloat(t, calculatedTasks);
      t.isCritical = t.totalFloat <= 0;
      
      // Update UI fields
      t.startDate = t.earlyStart;
      t.endDate = t.earlyFinish;
    });

    return calculatedTasks;
  }

  private calculateFreeFloat(task: any, allTasks: any[]): number {
    const successors = allTasks.filter(t => 
      t.dependencies && t.dependencies.some((d: any) => d.predecessorId === task.id)
    );
    if (successors.length === 0) return task.totalFloat;

    let minSuccES = Infinity;
    successors.forEach((succ: any) => {
      if (succ._es < minSuccES) minSuccES = succ._es;
    });

    return Math.max(0, minSuccES - task._ef);
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
