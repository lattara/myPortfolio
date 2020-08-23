import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProjectsService } from 'src/app/services/projects.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project.model';
import { dashboardMenuItems } from '../admin-dashboard/dashboard-menu-items';
import { HttpClient } from '@angular/common/http';
import { ToolboxItemService } from 'src/app/services/toolboxItem.service';
import { ToolboxService } from 'src/app/services/toolbox.service';
import { ToolboxItem } from 'src/app/models/toolboxItem';
import { ProjectsDataSource } from '../../models/projectDataSource';

@Component({
  selector: 'app-projects-dashboard',
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProjectsDashboardComponent implements OnInit {

  constructor(
    private projectsService: ProjectsService,
    private http: HttpClient,
    private toolboxItemService: ToolboxItemService,
    private toolboxService: ToolboxService) { }

  dashboardMenuItems = dashboardMenuItems;
  projects: any;
  toolboxItems: ToolboxItem[] = [];
  newProject: Project = new Project();
  columnsToDisplay = ['id', 'name', 'edit/delete'];
  projectToEdit: Project;
  toolboxToEdit: any;
  idProjectToEdit: number;
  expandedElement: Project | null;
  projectDetailsTable: Project[] = [];
  dataSource: ProjectsDataSource | null;
  project: Project;
  toolbox: ToolboxItem[];

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    youtube_link: new FormControl('', Validators.required),
    github_link: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.getAllProjectsWithToolbox();
  }

  getAllProjectsWithToolbox() {
    let projectArr;
    let toolboxArr;
    this.projectsService.getProjects().subscribe((projects: Project[]) => {
      projectArr = projects;
      this.projects = projects;
      projects.forEach(project => {
        this.toolboxService.getToolboxItemByProjectId(project.id).subscribe((toolbox: ToolboxItem []) => {
          toolboxArr = toolbox;
          project.toolbox = toolboxArr;
        }
        );
        this.dataSource = new ProjectsDataSource(this.projects);
      });
    });
  }


  getAllToolboxItems() {
    this.toolboxItemService.getToolboxItems().subscribe(items => {
      this.toolboxItems = items;
    });
  }

  createProject() {
    this.newProject.name = this.formGroup.value.name;
    this.newProject.description = this.formGroup.value.description;
    this.newProject.youtube_link = this.formGroup.value.youtube_link;
    this.newProject.github_link = this.formGroup.value.github_link;
    this.getAllProjectsWithToolbox();
    this.projectsService.postProject(this.newProject).subscribe(
      (error) => {
        console.error(error);
      }
    );
  }

  deleteProject(project: Project) {
    this.projectsService.deleteProject(project.id).subscribe(
      () => {
        for (let i = 0; i < this.projects.length; i++) {
          if (this.projects[i].id === project.id) {
            this.projects.slice(i, 1);
            this.dataSource.data = this.projects;

          }
        }
      }
    );
  }

  editProject(project: Project) {
    this.idProjectToEdit = project.id;
    this.projectToEdit = project;
    this.toolboxToEdit = project.toolbox;
    this.formGroup.patchValue(project);
  }

  saveEditedProject() {
    this.projectToEdit.name = this.formGroup.value.name;
    this.projectToEdit.description = this.formGroup.value.description;
    this.projectToEdit.youtube_link = this.formGroup.value.youtube_link;
    this.projectToEdit.github_link = this.formGroup.value.github_link;
    this.projectsService.putProject(this.projectToEdit, this.idProjectToEdit).subscribe(result => { this.getAllProjectsWithToolbox(); });
  }

  // toolbox items logic
  removeToolboxItem(projectToEditId: number, toolboxItemId: number, i: number) {
    this.toolboxService.deleteFromToolbox(projectToEditId, toolboxItemId).subscribe(
      () => {
        this.projectToEdit.toolbox.splice(i, 1);
      }
    );
  }

  addToolboxItem(projectToEditId: number, toolboxItemId: number, toolboxItem: ToolboxItem) {
    this.toolboxService.postToolboxItem(projectToEditId, toolboxItemId).subscribe(
      () => {
        this.toolboxToEdit.push(toolboxItem);
      }
    );
  }
}
