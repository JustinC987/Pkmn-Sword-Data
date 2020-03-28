import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material';

import { UncaughtPokemon } from '../../models/uncaught-pokemon';
import { UncaughtPokemonService } from './uncaught-pokemon.server';
import { AddUncaughtModalComponent } from '../modals/add-uncaught-modal/add-uncaught-modal.component';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { EditModalComponent } from '../modals/edit-modal/edit-modal.component';


@Component({
  selector: 'app-uncaught-pokemon',
  templateUrl: './uncaught-pokemon.component.html',
  styleUrls: ['./uncaught-pokemon.component.scss']
})
export class UncaughtPokemonComponent implements OnInit {
	

public pokemon: UncaughtPokemon[];
public pokemonSingle: UncaughtPokemon;
public emptyArray: boolean;

dataSource: MatTableDataSource<UncaughtPokemon>;

displayedColumns: string[] = ['select', 'dexNumber', 'name', 'area', 'sprite', 'id'];
selection = new SelectionModel<UncaughtPokemon>(true, []);

@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog, private uncaughtPokemonService: UncaughtPokemonService) { }

  ngOnInit() {

    this.getUncaughtPokemon();

  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		if (this.dataSource) {
			const numSelected = this.selection.selected.length;
			const numRows = this.dataSource.data.length;
			return numSelected === numRows;
		}
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		if (this.dataSource) {
			this.isAllSelected()
				? this.selection.clear()
				: this.dataSource.data.forEach((row) => this.selection.select(row));
		}
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: UncaughtPokemon): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
  
  getUncaughtPokemon() {
			this.uncaughtPokemonService.getUncaughtPokemon({}).subscribe((pkmn) => {
				this.pokemon = pkmn;
				this.dataSource = new MatTableDataSource(pkmn);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				if (this.pokemon.length === 0) {
					this.emptyArray = true;
				} else {
					this.emptyArray = false;
				}
			});
		}
	

	addPokemon() {
		this.dialog.open(AddUncaughtModalComponent).afterClosed().subscribe(() => {
			this.getUncaughtPokemon();
		});
	}
	
	editPokemon(pkmn: UncaughtPokemon) {
		
		this.dialog
			.open(EditModalComponent, {
				data: pkmn
			})
			.afterClosed()
			.subscribe(() => {
				this.getUncaughtPokemon();
			});
	}
	
	editSelection() {
		if (this.selection.selected.length > 1) {
			alert('Please select only one album to edit.');
			return;
		}
		else if (this.selection.selected.length) {
			this.selection.selected.forEach((album) => {
				this.dialog.open(AddUncaughtModalComponent, {
					data: album
				});
			});

			this.dialog.afterAllClosed.subscribe(() => {
				this.getUncaughtPokemon();
			});
		}
		else {
			alert('Please select albums to edit.');
		}
	}

	deleteSelection() {
		const nSelected = this.selection.selected.length;

		if (nSelected) {
			if (confirm('Are you sure you would like to delete ' + nSelected + ' pokemon(s)?')) {
				const promises = [];

				this.selection.selected.forEach((pkmn) => {
					promises.push(this.uncaughtPokemonService.deletePokemon(pkmn.id).toPromise());
				});

				Promise.all(promises).then(() => this.getUncaughtPokemon());
			}
		} else {
			alert('Please select stocks to delete.');
		}
	}

	/*
	* Delete user from row
	*/

	deletePokemon(pkmnId) {
		this.dialog
			.open(DeleteModalComponent, {
				data: pkmnId
			})
			.afterClosed()
			.subscribe(() => {
				this.getUncaughtPokemon();
			});
	}
}
