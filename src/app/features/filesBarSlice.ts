import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IFile } from '../../interface';

export interface IInitialState {
  openedFiles: IFile[];
  clickedFile: IClickedFile;
}

export interface IClickedFile {
  activeTab: string | null;
  fileName: string;
  fileContent: string | undefined;
  tabHistory: string[]; // تاريخ التبات النشطة
}

const initialState: IInitialState = {
  openedFiles: [],
  clickedFile: {
    activeTab: null,
    fileName: '',
    fileContent: undefined,
    tabHistory: [],
  },
};

export const fileBarSlice = createSlice({
  name: 'fileBarSlice',
  initialState,
  reducers: {
    setOpenedFiles: (state, action: PayloadAction<IFile[]>) => {
      state.openedFiles = action.payload;

      const currentActiveTabExists = state.openedFiles.some(
        (file) => file.id === state.clickedFile.activeTab
      );

      if (!currentActiveTabExists && state.openedFiles.length > 0) {
        const firstFile = state.openedFiles[0]; 
        
        
        state.clickedFile = {
          activeTab: firstFile.id,
          fileName: firstFile.name,
          fileContent: firstFile.content,
          tabHistory: [...state.clickedFile.tabHistory, firstFile.id].filter((id, index, self) => self.lastIndexOf(id) === index
          // save the last id always
          
        )
        };
      }
      
    },
    setClosedFiles: (state, action: PayloadAction<string | null>) => {
      const idsToClose = action.payload;
      if (!idsToClose) return; // تجنب الحالات اللي فيها idsToClose null

      state.openedFiles = state.openedFiles.filter((file) => file.id !== idsToClose);

      // Check if the current activeTab still exists after closing
      const currentActiveTabExists = state.openedFiles.some(
        (file) => file.id === state.clickedFile.activeTab
      );

      if (!currentActiveTabExists && state.openedFiles.length > 0) {
        // Update tabHistory by removing the closed tab
        const updatedTabHistory = state.clickedFile.tabHistory.filter((id) => id !== idsToClose);
        
        // Find the most recent tab in history that still exists in openedFiles
        let selectedTab = null;
        
        // Traverse tabHistory in reverse order (newest to oldest)
        for (let i = updatedTabHistory.length - 1; i >= 0; i--) {
          const historyTabId = updatedTabHistory[i];
          const tabExists = state.openedFiles.find(file => file.id === historyTabId);
          
          if (tabExists) {
            selectedTab = tabExists;
            break; // Found the most recent tab that still exists
          }
        }
        
        // If no valid tab found in history, use the last tab in openedFiles as fallback
        if (!selectedTab && state.openedFiles.length > 0) {
          selectedTab = state.openedFiles[state.openedFiles.length - 1];
        }
        
        // Update clickedFile with the selected tab
        state.clickedFile = {
          activeTab: selectedTab!.id,
          fileName: selectedTab!.name,
          fileContent: selectedTab!.content,
          tabHistory: updatedTabHistory,
        };
      } else if (state.openedFiles.length === 0) {
        state.clickedFile = {
          activeTab: null,
          fileName: '',
          fileContent: undefined,
          tabHistory: [],
        };
      }
    },
    setClosedAllFiles: (state) => {
      state.openedFiles = [];
      state.clickedFile = {
        activeTab: null,
        fileName: '',
        fileContent: undefined,
        tabHistory: [],
      };
    },
    setCloseToTheRight: (state, action: PayloadAction<string | null>) => {
      const index = state.openedFiles.findIndex((file) => file.id === action.payload);
      if (index !== -1) {
        state.openedFiles = state.openedFiles.filter((_, i) => i <= index);

        // Check if openedFiles is empty after filtering
        if (state.openedFiles.length === 0) {
          state.clickedFile = {
            activeTab: null,
            fileName: '',
            fileContent: undefined,
            tabHistory: [],
          };
          return;
        }

        // Always check if current active tab still exists
        const currentActiveTabExists = state.openedFiles.some(
          (file) => file.id === state.clickedFile.activeTab
        );

        // If active tab was closed or doesn't exist after filtering
        if (!currentActiveTabExists) {
          // Try to use the tab at the clicked index first, then fall back to the last remaining tab
          const newActiveTab = state.openedFiles[index] || state.openedFiles[state.openedFiles.length - 1];
          if (newActiveTab) {
            state.clickedFile = {
              activeTab: newActiveTab.id,
              fileName: newActiveTab.name,
              fileContent: newActiveTab.content,
              tabHistory: state.clickedFile.tabHistory.filter((id) => state.openedFiles.some((f) => f.id === id)),
            };
          }
        }
      }
    },
    setClickedFile: (state, action: PayloadAction<IClickedFile>) => {
      // If tabHistory is provided in the payload, use it directly
      if (action.payload.tabHistory) {
        state.clickedFile = {
          ...state.clickedFile,
          ...action.payload,
          // Use tabHistory from payload
        };
      } else {
        // Otherwise, manage the tabHistory automatically by adding the new tab and keeping the last occurrences
        state.clickedFile = {
          ...state.clickedFile,
          ...action.payload,
          tabHistory: [...state.clickedFile.tabHistory, action.payload.activeTab || ''].filter((id, index, self) =>
            self.lastIndexOf(id) === index // Keep only the last occurrence of each tab ID
          ),
        };
      }
      console.log("Redux: Updating clickedFile", action.payload);
    },
  },
});

export const {
  setOpenedFiles,
  setClickedFile,
  setClosedFiles,
  setClosedAllFiles,
  setCloseToTheRight,
} = fileBarSlice.actions;

export default fileBarSlice.reducer;